import React from 'react';
import './Boarder.css';
import Square from './Square.js'


function calculateWinner(squares){
    
    const lines=[//獲勝的方式
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],


    ];
    for(let i=0;i<lines.length;i++){
        const[a,b,c]=lines[i];
        if(squares[a]&& squares[a]===squares[b]&&squares[a]===squares[c]){
            
            return squares[a];
            
        }
     
    }
    return null;
}



class Boarder extends React.Component{
    

    constructor(props){
        super(props)
        this.state={
            squares:Array(9).fill(null),
            turn: true,
            gamestart:true,
            peace: false,//紀錄平局
            num:0//紀錄有幾個square被點擊
            
        }
    }


    myhandle(i){
        const newarray=this.state.squares.slice();
        
        if (calculateWinner(newarray) ) {
            
            return;//當有獲勝者，不回傳任何東西
          }
        else if(newarray[i]){
            
           return;//當平局(格子都被點過了)，不回傳任何東西
            
             
        }
        newarray[i]=this.state.turn? 'X':'O';
        this.setState({
            squares:newarray,
            turn:!this.state.turn,
            
        });
        this.state.num++;
    }
    mysquare(i){
        return(
            <Square value={this.state.squares[i]} onClick={()=>this.myhandle(i)}></Square>
            
                 
        )
    }

    gameStart= ()=> {
        // this.setState({gamestart:!this.state.gamestart});
        this.state.gamestart=!this.state.gamestart;
        this.state.peace='false';
      }

     
     

    render(){
        
        const winner=calculateWinner(this.state.squares);
        var elems = document.getElementsByClassName('start_background');

        
        
        let status;
        if(winner){
            
            status='Winner:    '+winner; 
            this.state.gamestart='true';
            this.state.num=0;
            
           
        }
        else if(this.state.num<9){
            status='Next player : '+(this.state.turn?'X':'O');
            
           
        }   
        else {

            status='A Draw'; 
            this.state.gamestart='true';
            this.state.num=0;
            
            
        }
          


        return(
            
            <div className='boarder'>
            
            <div className="status">{status}</div>
            <div className='row'>   
                {this.mysquare(0)}
                {this.mysquare(1)}
                {this.mysquare(2)}
            </div> 

            <div className='row'>
                {this.mysquare(3)}
                {this.mysquare(4)}
                {this.mysquare(5)}
            </div>

            <div className='row'>
                {this.mysquare(6)}
                {this.mysquare(7)}
                {this.mysquare(8)}
            </div>
            <div className='background'></div>  
            
            
               {
                   this.state.gamestart &&//控制起始畫面
                <div  className='start_background'>
                <button  className="start" 
                onClick={() => {
                    
                    this.gameStart();
                    this.setState({squares:Array(9).fill(null)}); // 清空
    
                                }} >Start</button>
              
               </div>

                }           
       
            </div>
        )
                    
    }
}


export default Boarder;