<template>
  <v-dialog v-model="modalVisivel" persistent max-width="600">
    <v-card>
      <v-card-title v-if="modoEdicao">
        <v-icon color="primary">mdi-pencil-box-outline</v-icon>Editar Estado
      </v-card-title>
      <v-card-title v-else>
        <v-icon color="primary">mdi-plus</v-icon>Cadastrar Estado
      </v-card-title>
      <v-card-text>
        <v-form ref="formEstado">
          <v-text-field
            v-model="nome"
            label="Nome"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
          ></v-text-field>
          <v-text-field
            v-model="abreviacao"
            label="Abreviação"
            :rules="[
                v => !!v || 'Abreviação é obrigatória',
                v => v && v.length == 2 || 'Abreviação deve ter 2 caracteres'
            ]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions style="display: flex; justify-content: space-evenly; padding-bottom: 20px">
        <v-btn outlined width="160" color="primary" @click="fecharModal">Cancelar</v-btn>
        <v-btn v-if="modoEdicao" depressed width="160" color="primary" @click="editarEstado">Editar</v-btn>
        <v-btn v-else depressed width="160" color="primary" @click="cadastarEstado">Cadastrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "../services/api";
export default {
  nome: "ModalEstado",
  props: {
    modalVisivel: Boolean,
    estado: Object,
    modoEdicao: Boolean
  },
  data: () => ({
    nome: "",
    abreviacao: ""
  }),
  mounted() {
    if (this.estado && this.modoEdicao) {
      this.nome = this.estado.nome;
      this.abreviacao = this.estado.abreviacao;
    }
  },
  methods: {
    fecharModal(recarregar) {
      this.$refs.formEstado.reset();
      if (recarregar) {
        this.$emit("reload");
      }
      this.$emit("close");
    },
    async cadastarEstado() {
      if (this.$refs.formEstado.validate()) {
        try {
          const payload = {
            nome: this.nome,
            abreviacao: this.abreviacao
          };
          await api.post("/estado", payload);
          this.$notify({
            title: "Estado cadastrado!",
            text: "O Estado foi cadastrado com sucesso!",
            type: "success",
            duration: 5000
          });
          this.fecharModal(true);
        } catch (error) {
          this.$notify({
            title: "Erro ao cadastrar o Estado!",
            text: error.message,
            type: "error",
            duration: 15000
          });
        }
      }
    },
    async editarEstado() {
      if (this.$refs.formEstado.validate()) {
        try {
          const payload = {
            nome: this.nome,
            abreviacao: this.abreviacao
          };
          await api.put(`/estado/${this.estado.id}`, payload);
          this.$notify({
            title: "Estado editado!",
            text: "O Estado foi editado com sucesso!",
            type: "success",
            duration: 5000
          });
          this.fecharModal(true);
        } catch (error) {
          error.message.forEach(m => {
            this.$notify({
              title: "Erro ao editar o Estado!",
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