import React, { Component } from 'react'
import ContestList from './ContestList';

export class Menu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            active : 'Div. 1',
        }
    }
    render() {
                var div1='item',div2='item',div3='item',out;
                if(this.state.active==='Div. 1')
                    div1='active item';
                else if(this.state.active==='Div. 2')
                    div2='active item';
                else
                    div3='active item';
                if(this.props.show===true)
                    out=<ContestList name={this.props.name} active={this.state.active}></ContestList>
                return (
                    <div class = 'ui container' style={{marginTop :'1em',marginBottom :'25px'}}>
                        <div class = 'ui top attached pointing menu'>
                            <div class = {div1} name='Div. 1' onClick={() => this.setState({active : 'Div. 1'})}> Div 1</div>
                            <div class = {div2} name='Div. 2' onClick={() => this.setState({active : 'Div. 2'})}> Div 2</div>
                            <div class = {div3} name='Div. 3' onClick={() => this.setState({active : 'Div. 3'})}> Div 3</div>
                        </div>
                        <div class = 'ui bottom attached segment'>{out}</div>
                    </div>
                )
    }
}

export default Menu
