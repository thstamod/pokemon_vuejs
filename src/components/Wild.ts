import { Component, Prop, Vue, Emit } from "vue-property-decorator"
import pokemonContext from "../types/pokemonContext"
import WithRender from "./Wild.html"

@WithRender
@Component
export default class Wild extends Vue {
  private title = "Wild"
  @Prop() private pokemon!: pokemonContext
  @Prop() private pokemonIsAppeared!: boolean
  @Prop() private ashIsAppeared!: boolean
  @Prop() private pokeballIsAppeared!: boolean
  private loadedPokemon = false
  private loadedAsh = false
  private loadedPokeball = false

  loadImgPokemon(): void {
    this.loadedPokemon = true
  }
  loadImgPokeball(): void {
    this.loadedPokeball = true
  }
  loadImgAsh(): void {
    this.loadedAsh = true
  }
  getImgUrl(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.pokemon.id}.png`
  }
  @Emit()
  afterEnterBall(): void {
    this.$emit("pokeballExit")
  }
  @Emit()
  afterLeave(): void {
    this.$emit("escaped")
  }
}
