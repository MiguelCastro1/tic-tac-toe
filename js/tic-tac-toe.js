// TIC TAC TOE
const tic_tac_toe = {

    // ATTRIBUTES
    board: ['','','','','','','','',''],
    symbols: {
                options: ['O','X'],
                turn_index: 0,
                change(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    container_element: null,
    gameover: false,
    nivel: 0,
    maquina: false,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // FUNCTIONS
    init(container) {
        this.container_element = container;
    },

    make_play_pc(){
        let position = -1;
        let checked = false;
        while(true){
            if(this.nivel == 1){
                position = Math.floor(Math.random() * 10);
                if(this.board[position] === '')
                    break;

            }else if(this.nivel == 2){
                if(!checked){
                    checked = true;
                    let turn = this.symbols.options[this.symbols.turn_index];
                    position = this.check_possible_winning_sequences(turn);
                    if(position !== -1)
                        break;

                    turn = this.symbols.options[1 - this.symbols.turn_index];
                    console.log("turn " +position);
                    position = this.check_possible_winning_sequences(turn);
                    if(position != -1)
                        break;

                   
                }else{
                    position = Math.floor(Math.random() * 10);
                    if(this.board[position] === '')
                        break;
                }
            }else if(this.nivel == 3){
             
            }
        }
        console.log(position);
        return position;
    },

    make_play(position, human = true) {
        if (this.gameover || this.board[position] !== '') return false;

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();

            if(this.maquina && human && !this.is_game_over()){
                let pos = this.make_play_pc();
                this.make_play(pos,false);
            }
        }

        return true;
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    
      check_possible_winning_sequences(symbol) {
        let postition = -1;
        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == '') {
                return this.winning_sequences[i][2];
            }
            if (this.board[ this.winning_sequences[i][0] ] == ''  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                return this.winning_sequences[i][0];
            }
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == '' &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                return this.winning_sequences[i][1];
            }
        }
        
        return -1;
    },
    check_winning_sequences(symbol) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                //window.alert(`Jogador ${this.symbols.options[this.symbols.turn_index]} Ganhou!`);
                return i;
            }
        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    is_game_over() {
        return !this.board.includes('');
    },

    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    restart(maquina = false,nivel = 0) {

        this.maquina = maquina;
        this.nivel = nivel;
        this.start();

        let btns = document.getElementsByClassName("btn");
        console.log('this game has been restarted!')
        if(maquina){
            btns[0].style.color = "white";
            btns[1].style.color = "yellow";
            if(this.symbols.turn_index == 0){
                let pos = this.make_play_pc();
                this.make_play(pos,false);
            }
            opcoes("hidden");
            
        }else{
            btns[1].style.color = "white";
            btns[0].style.color = "yellow";
        }
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};