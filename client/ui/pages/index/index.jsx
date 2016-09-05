// Import main components / modules
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import React, { Component } from 'react'
import { render } from 'react-dom'

// Import custom components
import PokeDropdown from '../../components/poke-dropdown/poke-dropdown.jsx'
import PokeList from '../../components/poke-list/poke-list.jsx'
import PokeGif from '../../components/poke-gif/poke-gif.jsx'

// Import collections
import { Pokemons } from '../../../../collections/collections.js'


export default class Index extends Component {
  constructor(props) {
   super(props)
   this.state = {
     pokeUrl: 'http://www.pokestadium.com/sprites/xy/rayquaza.gif'
   }
 }

 renderPokemon(name) {
   if (name) {
     let pokeName = name.toLowerCase()
     let pokeUrl = `http://www.pokestadium.com/sprites/xy/${pokeName}` + '.gif'

     this.setState({ pokeUrl })
   }
 }

 renderPokeDropdown() {
   return this.props.pokemons.map((p) => {
     return <PokeList key={p._id}
                      name={p.name}
                     onClick={this.renderPokemon.bind(this, p.name)} />
   })
 }

 render() {
   return (
     <div>
       <header className="jumbotron">
         <PokeGif url={this.state.pokeUrl} />
       </header>

       <PokeDropdown renderPokeDropdown={this.renderPokeDropdown()} />
     </div>
   )
 }
}

export default IndexContainer = createContainer(() => {
  Meteor.subscribe('pokemons')

  const pokemons = Pokemons.find().fetch()

  return { pokemons }
}, Index)