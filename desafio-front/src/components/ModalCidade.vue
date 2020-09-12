<template>
  <v-dialog v-model="modalVisivel" persistent max-width="600">
    <v-card>
      <v-card-title v-if="modoEdicao">
        <v-icon color="primary">mdi-pencil-box-outline</v-icon>Editar Cidade
      </v-card-title>
      <v-card-title v-else>
        <v-icon color="primary">mdi-plus</v-icon>Cadastrar Cidade
      </v-card-title>
      <v-card-text>
        <v-form ref="formCidade">
          <v-text-field
            v-model="nome"
            label="Nome"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
          ></v-text-field>
          <v-select
            v-model="estadoSelecionado"
            :items="estadosFormatados"
            item-text="label"
            item-value="value"
            label="Selecione o Estado"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions style="display: flex; justify-content: space-evenly; padding-bottom: 20px">
        <v-btn outlined width="160" color="primary" @click="fecharModal">Cancelar</v-btn>
        <v-btn v-if="modoEdicao" depressed width="160" color="primary" @click="editarCidade">Editar</v-btn>
        <v-btn v-else depressed width="160" color="primary" @click="cadastarCidade">Cadastrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "../services/api";
export default {
  nome: "ModalCidade",
  props: {
    modalVisivel: Boolean,
    cidade: Object,
    modoEdicao: Boolean
  },
  data: () => ({
    nome: "",
    estadoSelecionado: null,
    estadosFormatados: []
  }),
  async mounted() {
    const estados = await api.get("/estado");
    this.estadosFormatados = estados.map(e => ({
      label: e.nome,
      value: e
    }));
    if (this.cidade && this.modoEdicao) {
      this.nome = this.cidade.nome;
      this.estadoSelecionado = {
        label: this.cidade.estado.nome,
        value: this.cidade.estado
      };
    }
  },
  methods: {
    fecharModal(recarregar) {
      this.$refs.formCidade.reset();
      if (recarregar) {
        this.$emit("reload");
      }
      this.$emit("close");
    },
    async cadastarCidade() {
      if (this.$refs.formCidade.validate()) {
        try {
          const payload = {
            nome: this.nome,
            estadoId: this.estadoSelecionado.id
          };
          await api.post("/cidade", payload);
          this.$notify({
            title: "Cidade cadastrada!",
            text: "A Cidade foi cadastrado com sucesso!",
            type: "success",
            duration: 5000
          });
          this.fecharModal(true);
        } catch (error) {
          this.$notify({
            title: "Erro ao cadastrar a Cidade!",
            text: error.message,
            type: "error",
            duration: 15000
          });
        }
      }
    },
    async editarCidade() {
      if (this.$refs.formCidade.validate()) {
        try {
          const payload = {
            nome: this.nome,
            estado: this.estadoSelecionado.id
          };
          await api.put(`/cidade/${this.cidade.id}`, payload);
          this.$notify({
            title: "Cidade editada!",
            text: "A Cidade foi editada com sucesso!",
            type: "success",
            duration: 5000
          });
          this.fecharModal(true);
        } catch (error) {
          error.message.forEach(m => {
            this.$notify({
              title: "Erro ao editar a Cidade!",
              text: m,
              type: "error",
              duration: 15000
            });
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>