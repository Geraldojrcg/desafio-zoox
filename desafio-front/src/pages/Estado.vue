<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-btn text to="home">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>Estados
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="abrirModalEstado()">
              <v-icon>mdi-plus</v-icon>Cadastrar Estado
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
            :items="estados"
            :items-per-page="10"
            :search="busca"
            class="elevation-1"
          >
            <template v-slot:item.abreviacao="{ item }">
              <v-chip>{{ item.abreviacao }}</v-chip>
            </template>
            <template v-slot:item.dataCriacao="{ item }">
              <span>{{ new Date(item.dataCriacao).toLocaleString() }}</span>
            </template>
            <template v-slot:item.dataUltimaAlteracao="{ item }">
              <span>{{ new Date(item.dataUltimaAlteracao).toLocaleString() }}</span>
            </template>
            <template v-slot:item.id="{ item }">
              <v-btn text color="blue" @click="abrirModalEstado(item)">
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
    <ModalEstado
      :key="String(estadoSelecionado ? estadoSelecionado.id : Math.random())"
      :modalVisivel="modalEstadoVisivel"
      :modoEdicao="!!estadoSelecionado"
      :estado="estadoSelecionado"
      @close="fecharModalEstado"
      @reload="listarEstados"
    />

    <ModalConfirmacao
      :modalVisivel="modalConfirmacaoVisivel"
      frase="Deseja realmente excluir o Estado?"
      @close="fecharModalConfirmacao"
      :onConfirm="excluirEstado"
    />
  </v-container>
</template>

<script>
import api from "../services/api";
import ModalEstado from "../components/ModalEstado";
import ModalConfirmacao from "../components/ModalConfirmacao";

export default {
  name: "Estado",
  components: {
    ModalEstado,
    ModalConfirmacao
  },
  data: () => ({
    headers: [
      { text: "Nome", value: "nome" },
      { text: "Abreviação", value: "abreviacao" },
      { text: "Data de criação", value: "dataCriacao" },
      { text: "Data de edição", value: "dataUltimaAlteracao" },
      { text: "Ações", value: "id" }
    ],
    estados: [],
    busca: "",
    estadoSelecionado: null,
    modalEstadoVisivel: false,
    modalConfirmacaoVisivel: false
  }),
  async mounted() {
    this.$loading(true);
    await this.listarEstados();
    this.$loading(false);
  },
  methods: {
    async listarEstados() {
      const estados = await api.get("/estado");
      this.estados = estados;
    },
    abrirModalEstado(estado) {
      this.estadoSelecionado = estado;
      this.modalEstadoVisivel = !this.modalEstadoVisivel;
    },
    fecharModalEstado() {
      this.estadoSelecionado = null;
      this.modalEstadoVisivel = !this.modalEstadoVisivel;
    },
    abrirModalConfirmacao(estado) {
      this.estadoSelecionado = estado;
      this.modalConfirmacaoVisivel = !this.modalConfirmacaoVisivel;
    },
    fecharModalConfirmacao() {
      this.modalConfirmacaoVisivel = !this.modalConfirmacaoVisivel;
    },
    async excluirEstado() {
      try {
        await api.delete(`/estado/${this.estadoSelecionado.id}`);
        this.$notify({
          title: "Estado excluído!",
          text: "O Estado foi excluído com sucesso!",
          type: "success",
          duration: 5000
        });
        await this.listarEstados();
      } catch (error) {
        this.$notify({
          title: "Erro ao excluir o Estado!",
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