import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator"
import pokemonContext from "../types/pokemonContext"
import WithRender from "./Bag.html"
import eventBus from "../eventBus"

@WithRender
@Component
export default class Bag extends Vue {
  private title = "Bag"
  private pokeballs = 12
  @Prop() private inventory!: Array<pokemonContext>
  @Prop() private pokeball!: any

  mounted() {
    eventBus.$on(
      "POKEBALL_MINUS",
      function(this) {
        this.pokeballs--
        if (!this.pokeballs) {
          eventBus.$emit("NO_AVAILABLE_POKEBALLS")
        }
      }.bind(this)
    )
  }
}
