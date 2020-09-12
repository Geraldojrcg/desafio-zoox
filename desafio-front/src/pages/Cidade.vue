<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-btn text to="home">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>Cidades
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="abrirModalCidade()">
              <v-icon>mdi-plus</v-icon>Cadastrar Cidade
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="busca"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :items="cidades"
            :items-per-page="10"
            :search="busca"
            class="elevation-1"
          >
            <template v-slot:item.dataCriacao="{ item }">
              <span>{{ new Date(item.dataCriacao).toLocaleString() }}</span>
            </template>
            <template v-slot:item.dataUltimaAlteracao="{ item }">
              <span>{{ new Date(item.dataUltimaAlteracao).toLocaleString() }}</span>
            </template>
            <template v-slot:item.id="{ item }">
              <v-btn text color="blue" @click="abrirModalCidade(item)">
                <v-icon>mdi-pencil-box-outline</v-icon>
              </v-btn>
              <v-btn text color="red" @click="abrirModalConfirmacao(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <ModalCidade
      :key="String(cidadeSelecionada)"
      :modalVisivel="modalCidadeVisivel"
      :modoEdicao="!!cidadeSelecionada"
      :cidade="cidadeSelecionada"
      @close="fecharModalCidade"
      @reload="listarCidades"
    />

    <ModalConfirmacao
      :modalVisivel="modalConfirmacaoVisivel"
      frase="Deseja realmente excluir a Cidade?"
      @close="fecharModalConfirmacao"
      :onConfirm="excluirCidade"
    />
  </v-container>
</template>

<script>
import api from "../services/api";
import ModalCidade from "../components/ModalCidade";
import ModalConfirmacao from "../components/ModalConfirmacao";

export default {
  name: "Cidade",
  components: {
    ModalCidade,
    ModalConfirmacao
  },
  data: () => ({
    headers: [
      { text: "Nome", value: "nome" },
      { text: "Estado", value: "estado.nome" },
      { text: "Data de criação", value: "dataCriacao" },
      { text: "Data de edição", value: "dataUltimaAlteracao" },
      { text: "Ações", value: "id" }
    ],
    cidades: [],
    busca: "",
    cidadeSelecionada: null,
    modalCidadeVisivel: false,
    modalConfirmacaoVisivel: false
  }),
  async mounted() {
    this.$loading(true);
    await this.listarCidades();
    this.$loading(false);
  },
  methods: {
    async listarCidades() {
      const cidades = await api.get("/cidade");
      this.cidades = cidades;
    },
    abrirModalCidade(cidade) {
      this.cidadeSelecionada = cidade;
      this.modalCidadeVisivel = !this.modalCidadeVisivel;
    },
    fecharModalCidade() {
      this.cidadeSelecionada = null;
      this.modalCidadeVisivel = !this.modalCidadeVisivel;
    },
    abrirModalConfirmacao(cidade) {
      this.cidadeSelecionada = cidade;
      this.modalConfirmacaoVisivel = !this.modalConfirmacaoVisivel;
    },
    fecharModalConfirmacao() {
      this.modalConfirmacaoVisivel = !this.modalConfirmacaoVisivel;
    },
    async excluirCidade() {
      try {
        await api.delete(`/cidade/${this.cidadeSelecionada.id}`);
        this.$notify({
          title: "Cidade excluída!",
          text: "A Cidade foi excluída com sucesso!",
          type: "success",
          duration: 5000
        });
        await this.listarCidades();
      } catch (error) {
        this.$notify({
          title: "Erro ao excluir a Cidade!",
          text: error.message,
          type: "error",
          duration: 15000
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>