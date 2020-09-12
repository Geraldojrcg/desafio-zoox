<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card class="mx-auto" max-width="400" style="background-color: #F0F4C3">
            <v-card-text>
              <v-row>
                <v-col>
                  <img
                    width="100"
                    height="100"
                    src="https://clipartart.com/images/clipart-court-house.png"
                  />
                </v-col>
                <v-col style="display: flex; flex-direction: column; justify-content: center">
                  <p class="display-2 text--primary">1</p>
                  <h3 class="text--primary">Estados cadastrados</h3>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions style="display: flex; justify-content: center">
              <v-btn text color="primary" to="estados">Gerenciar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mx-auto" max-width="400" style="background-color: #FFCDD2">
            <v-card-text>
              <v-row>
                <v-col>
                  <img
                    width="100"
                    height="100"
                    src="https://frontlinedebtadvice.org.uk/moodle/pluginfile.php/2/course/section/2/centres.png"
                  />
                </v-col>
                <v-col style="display: flex; flex-direction: column; justify-content: center">
                  <p class="display-2 text--primary">2</p>
                  <h3 class="text--primary">Cidades cadastradas</h3>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions style="display: flex; justify-content: center">
              <v-btn text color="primary" to="cidades">Gerenciar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss" scoped>
</style>