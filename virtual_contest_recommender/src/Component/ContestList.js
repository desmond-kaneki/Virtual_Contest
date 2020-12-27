import React, { Component } from 'react'

var url = "https://codeforces.com/api/user.status?handle="
const url2 = "https://codeforces.com/api/contest.list?gym=false"
export class ContestList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            submission : [],
            prevContest : [],
            username : [],
            active : 'Div 1',
            currentPage : 1,
            usercontest : []
        }
        
    }
    componentDidUpdate()
    {
        var names = this.props.name+[];
        if(this.state.active!==this.props.active)
        {
            this.setState({
                active : this.props.active,
            })
        }
        if(this.state.username!==names)
        {
            this.setState({
                username : names,
            })
            names = names.split(',');
            var sub = new Set();
            for(var k=0;k<names.length;k++)
            {
                fetch(url+names[k])
                    .then(response => response.json())
                    .then(data =>{
                        sub = this.state.submission;
                        for(var id=0;id<data.result.length;id++)
                        {
                            sub.push(data.result[id]['problem']['contestId']);
                        }
                        sub = [...new Set(sub)];
                        this.setState({
                            submission : sub
                        })
                    });
            }
        }
    }
    componentDidMount()
    {
        var names = this.props.name+[];
        names = names.split(',');
        this.setState({
            username : this.props.name
        })
        fetch(url2)
            .then(response => response.json())
            .then(data => this.setState({prevContest : data.result}));
        fetch(url+names[0])
            .then(response => response.json())
            .then(data => this.setState({submission : data.result}));
    }
    zeroPad = (num, places) => String(num).padStart(places, '0')
    render() {
            var previous = [],virtualContest = [],contest = [],listItem=0;
            for(var i=0;i<this.state.prevContest.length;i++)
            {   
                var id = this.state.prevContest[i]['id'],obj,hr,min;
                min= (this.state.prevContest[i]['durationSeconds']/60)%60;
                hr = this.state.prevContest[i]['durationSeconds']/3600;
                hr = Math.floor(hr);
                hr = this.zeroPad(hr,2);
                min= this.zeroPad(min,2);
                obj = {
                    id : id,
                    name : this.state.prevContest[i]['name'],
                    hour : hr,
                    minutes : min,
                }
                if(this.state.prevContest[i]['phase']==="FINISHED"&&obj.name.includes(this.props.active))
                {
                    contest[id]=true;
                    previous.push(obj);
                }
            }
            var zz=0;
            for(i=0;i<this.state.submission.length;i++)
            {
                zz++;
                id = this.state.submission[i];
                if(contest[id]===true)
                {
                    contest[id]=false;
                }
            }
            for(let value of previous)
            {
                if(contest[value.id]===true)
                {
                    var cobj =   <tr class=''>
                                    <td class=''>
                                        {value.name}
                                        <br></br>
                                        <a href={"https://codeforces.com/contest/"+value.id}>Enter</a>
                                        <br></br>
                                        <a href={"https://codeforces.com/contestRegistration/"+value.id+"/virtual/true"}>Virtual Participation</a>
                                    </td>
                                    <td class=''>{value.hour}:{value.minutes} hr.</td>
                                </tr>
                    virtualContest.push(cobj);
                    listItem++;
                }
            }
            var maxPage = Math.ceil(listItem/25),pg=this.state.currentPage,show=[];
            var pages = [],pagination;   
            pages.push(<a onClick={() => this.setState({currentPage : Math.max(pg-1,1)})} aria-current="false" aria-disabled="false" tabindex="0" aria-label="Previous item" type="prevItem" class={"item"}>⟨</a>);
            pages.push(<a onClick={() => this.setState({currentPage : 1})} aria-current="false" aria-disabled="false" tabindex="0" type="pageItem" class={pg==1 ? "active item" : "item"}>1</a>);
            if(pg>4)
            pages.push(<a aria-current="false" aria-disabled="true" tabindex="-1" value="3" type="ellipsisItem" class="item">...</a>);
            for(var i=2;i<maxPage;i++)
            {
                const z=i;
                if(pg===i||pg===i+1||pg===i-1)
                    pages.push(<a onClick={() => this.setState({currentPage : z})} aria-current="false" aria-disabled="false" tabindex="0" type="pageItem" class={pg==i ? "active item" : "item"}>{i}</a>);
                else if(i<=5&&pg<=4)
                    pages.push(<a onClick={() => this.setState({currentPage : z})} aria-current="false" aria-disabled="false" tabindex="0" type="pageItem" class={pg==i ? "active item" : "item"}>{i}</a>);
                else if(i>=maxPage-4&&pg>=maxPage-3)
                    pages.push(<a onClick={() => this.setState({currentPage : z})} aria-current="false" aria-disabled="false" tabindex="0" type="pageItem" class={pg==i ? "active item" : "item"}>{i}</a>);
            }
            if(pg<maxPage-3)
            pages.push(<a aria-current="false" aria-disabled="true" tabindex="-1" value="7" type="ellipsisItem" class="item">...</a>);
            pages.push(<a onClick={() => this.setState({currentPage : maxPage})} aria-current="false" aria-disabled="false" tabindex="0" type="pageItem" class={pg==maxPage ? "active item" : "item"}>{maxPage}</a>);
            pages.push(<a onClick={() => this.setState({currentPage : Math.min(pg+1,maxPage)})} aria-current="false" aria-disabled="false" tabindex="0" aria-label="Next item" type="nextItem" class="item">⟩</a>);
            if(maxPage>1)
            {
                pagination= <div aria-label="Pagination Navigation" role="navigation" class="ui mini pagination menu">
                                {pages}
                            </div>
                show = virtualContest.slice((pg-1)*25,pg*25);
            }
            else
                show = virtualContest;
            
                var names = '';
                names =names+this.state.username; 
                var zz =[],name='',z=0;
                for(let char of names)
                {
                    if(char==',')
                    {
                        zz.push(name);
                        name='';
                        z++;
                    }
                    else
                        name +=char;
                }
                zz.push(name);
            return (
                <div class ='ui container' style={{marginBottom:'1em'}}>
                    <table class='ui striped table'>
                        <tbody class=''>
                            {show}   
                        </tbody>
                    </table>         
                    {pagination}
                </div>
            )
        
    }
}

export default ContestList
