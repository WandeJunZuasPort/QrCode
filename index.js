  function gerarZPL() { // FUNÇÃO QUE FAZ A GERAR OS QRCODE!!
            const op = document.getElementById('op').value.trim(); // SELECIONA O CAMPO DA OP 
            const quantidade = parseInt(document.getElementById('quantidade').value); // SELECIONA O CAMPO DE QUANTIDADES DE QRCODES!
            
            const opInput = document.getElementById('op'); 
            const quantidadeInput = document.getElementById('quantidade'); 

            const o0p = opInput.value.trim();
            const quantidadde = parseInt(quantidadeInput.value);

            let erro = false;

             // Resetando estilos
            opInput.classList.remove('erro');
            quantidadeInput.classList.remove('erro');

            if( !op.includes(";") ){ //CONDIÇÃO QUE VERIFICA SE CONTEM O ; PONTO E VIRGULA NA OP
                alert("Faltou o  ' ; '  o ponto e virgula mane!  ");
                opInput.classList.add('erro');//MUDA A COR DO INPUT
                erro = true;
                
            }if ( !op || isNaN(quantidade) || quantidade <= 2) { // VALIDA SE A QUATIDADE DE QRCODE E MENOR QUE 3
                alert('Verifique os campos, e certifique-se que a quantidade e maior maior ou igual a 3 ');
                quantidadeInput.classList.add("erro");//MUDA A COR DO INPUT
                erro = true;
              
            }if(erro){
                return;
            }

            let zpl = '';

            for (let i = 1; i <= quantidade; i += 3) { 
                zpl += '^XA\n';
                for (let idx = 0; idx < 3; idx++) {
                    const pos = i + idx;
                    if (pos > quantidade) break;

                    const x = 25 + idx * 270; // ESPAÇAMENTO ENTRE CADA QRCODE 
                    const y = 53; // ALTURA DOS QRCODE 
                    const seq = op + String(pos).padStart(5, '0'); //SEQUENCIA DE 0 (ZEROS) 00001 

                    zpl += `^FO${x},${y}^BQN,2,6^FDQA,${seq}^FS\n`; //TAMANHO DO QRCODE 

                    const text_y = y + 150; // ORIENTAÇÃO DA POSIÇÃO DO  TEXTO 
                    zpl += `^FO${x},${text_y}^A0N,40,25^FD${seq}^FS\n`;// ALTURA E LARGUARA DO CODIGO ABAIXO DO QRCODE 
                }
                zpl += '^XZ\n\n';
            }

            // Criar arquivo para download
            const blob = new Blob([zpl], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'qrcodes.txt';
            a.click();

            URL.revokeObjectURL(url);
        }