import React from 'react';
import './App.css';
import Menu from './Component/Menu';
class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       cur : '',
       username : [],
       status : 'FAILED',
    }
    this.Changename = this.Changename.bind(this);
    this.submit = this.submit.bind(this);
  }
  Changename(event)
  {
    this.setState({
      cur : event.target.value,
    })
  }
  submit(e)
  {
    e.preventDefault();
    fetch("https://codeforces.com/api/user.info?handles="+this.state.cur)
      .then(response => response.json())
      .then(data => this.setState({status : data.status}))
    if(this.state.status==='FAILED')
    {
      if(this.state.username.length!==0)
        alert('Invalid Username');
    }
    else if(this.state.status==='OK')
    {
      //alert('Valid');
      var usernames = this.state.username;
      usernames.push(this.state.cur);
      usernames = [...new Set(usernames)];
      this.setState({
        username : usernames,
      });
    }
  }
  deleteuser(index)
  {
    var usernames = this.state.username;
    usernames.splice(index,1);
    this.setState({
      username : usernames,
    })
  }
  render(){
    var output;
    if(this.state.status==='OK'&&this.state.username.length!==0)
        output=<Menu name={this.state.username} show={true}></Menu>;
    else
        output=<Menu show={false}></Menu>;
    var users = [];
    for(var i=0;i<this.state.username.length;i++)
    {
      const z=i;
      var card =  <div class='ui card' style={{width : 'auto'}}>
                    <div class='extra content'>{this.state.username[i]}<i class='trash icon' index={z} onClick = {() => this.deleteuser(z)}></i></div>
                  </div>;
      users.push(card);
    }
  return (
    <div>
      <header>
          <div >
                <div class="ui container" style={{marginTop : '3em'}}>
                  <div class="ui segment">
                    <div class="ui stackable very relaxed two column grid">
                      <div class="column" >
                        <div class="ui action input">
                          <input type='text' onChange={this.Changename} value={this.state.cur} placeholder="Username"></input>
                          <button class="ui button" type="submit" onClick={this.submit} value="Submit">Submit</button>
                        </div>
                      </div>
                      <div class="left aligned column">
                        <div class='ui centered cards'>
                         {users}
                        </div>
                      </div>
                    </div>
                    <div class='ui vertical divider'></div>
                  </div>
                </div>      
          </div>
          {output}    
      </header>
    </div>
  )
  }
}

export default App;
