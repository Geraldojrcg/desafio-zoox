<template>
  <v-dialog v-model="modalVisivel" persistent max-width="500">
    <v-card>
      <v-card-title>{{ frase }}</v-card-title>
      <br>
      <v-card-actions style="display: flex; justify-content: space-evenly; padding-bottom: 20px">
        <v-btn outlined width="160" color="primary" @click="fecharModal">Cancelar</v-btn>
        <v-btn depressed width="160" color="primary" @click="confirmar">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalConfirmacao",
  props: {
    modalVisivel: Boolean,
    frase: String,
    onConfirm: Function
  },
  methods: {
    fecharModal() {
      this.$emit("close");
    },
    confirmar() {
      this.fecharModal();
      this.onConfirm();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>