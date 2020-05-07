import { Component, Vue } from "vue-property-decorator"
import Bag from "./components/Bag"
import Wild from "./components/Wild"
import pokemons from "./data/pokemons"
import pokemonContext from "./types/pokemonContext"
import { getRandomInt, getRandom } from "./utils"
import WithRender from "./App.html"
import eventBus from "./eventBus"
import "./main.css"

@WithRender
@Component({
  components: {
    Wild,
    Bag,
  },
})
export default class App extends Vue {
  private wildpokemons: Array<pokemonContext> = pokemons
  private pokidex: any = []
  private appeared: pokemonContext = this.wildpokemons[0]
  private pokemonIsAppeared = true
  private ashIsAppeared = false
  private pokeballIsAppeared = false
  private pokeballsUnavailable = false
  private statuses: Array<string> = []

  mounted() {
    eventBus.$on(
      "NO_AVAILABLE_POKEBALLS",
      function(this) {
        this.pokeballsUnavailable = true
        this.addToLogs("No pokeballs available. Please restart the game!!")
      }.bind(this)
    )
  }

  fightFn(): void {
    this.addToLogs(`You choose to fight!!`)
    this.ashIsAppeared = true
  }
  nextFn(): void {
    this.pokemonIsAppeared = false
  }
  throwPokeballFn(): void {
    this.addToLogs(`You are throwing a pokeball!!`)
    this.pokeballIsAppeared = true
  }

  pokeballExit(): void {
    eventBus.$emit("POKEBALL_MINUS")
    this.pokeballIsAppeared = false
    if (getRandom() > 0.6) {
      this.wildpokemons = this.wildpokemons.filter(
        (pokemon) => pokemon.id !== this.appeared.id
      )
      this.pokidex.push(this.appeared)
      this.addToLogs(`You caught a ${this.appeared.name}!!`)
      this.ashIsAppeared = false
      this.pokemonIsAppeared = false
    } else {
      this.addToLogs(`You missed!!`)
    }
  }
  escapeFn(): void {
    this.addToLogs(`You choose to escape!!`)
    this.ashIsAppeared = false
    this.pokemonIsAppeared = false
  }
  selectRandomPokemon(): void {
    this.pokemonIsAppeared = true
    this.appeared = this.wildpokemons[getRandomInt(this.wildpokemons.length)]
    this.addToLogs(`${this.appeared.name} is appeared!!`)
  }
  addToLogs(text: string): void {
    if (this.statuses.length > 10) {
      this.statuses.shift()
    }
    this.statuses.push(text)
  }
}
