class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        // Objeto contendo os preços dos itens
        const cardapio = {
            cafe: 3.0,
            chantily: 1.5,
            suco: 6.2,
            sanduiche: 6.5,
            queijo: 2.0,
            salgado: 7.25,
            combo1: 9.5,
            combo2: 7.5
        }

        // Validação do método de pagamento
        if (!["dinheiro", "credito", "debito"].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Validação de carrinho vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Inicialização das variáveis principais
        let total = 0;
        let extra = "";
        let quantidadeExtra = 0;
        let third = "";
        let quantidadeThird = 0;

        // Extração das informações do primeiro item
        const mainItemInfo = itens[0].split(",");
        const lanche = mainItemInfo[0].toLowerCase();
        const quantidade = parseInt(mainItemInfo[1]);

        // Verificação e extração das informações do segundo item (se existir)
        if (itens.length > 1) {
            const extraItemInfo = itens[1].split(",");
            extra = extraItemInfo[0].toLowerCase();
            quantidadeExtra = parseInt(extraItemInfo[1]);
        }

        // Verificação e extração das informações do terceiro item (se existir)
        if (itens.length > 2) {
            const thirdItemInfo = itens[2].split(",");
            third = thirdItemInfo[0].toLowerCase();
            quantidadeThird = parseInt(thirdItemInfo[1]);
        }

        // Validação de itens inválidos
        if (!(lanche in cardapio) || (extra !== "" && !(extra in cardapio)) || (third !== "" && !(third in cardapio))) {
            return "Item inválido!";
        }

        // Validação de quantidades inválidas
        if (quantidade <= 0 || isNaN(quantidade) ||
            quantidadeExtra < 0 || isNaN(quantidadeExtra) || // Permitir 0 extras
            quantidadeThird < 0 || isNaN(quantidadeThird)) { // Permitir 0 no terceiro item
            return "Quantidade inválida!";
        }

        // Verificação de itens extras não permitidos com itens principais específicos
        if ((extra === "queijo" && lanche !== "sanduiche" && lanche !== "combo1" && lanche !== "combo2") ||
            (extra === "chantily" && lanche !== "cafe")) {
            return "Item extra não pode ser pedido sem o principal";
        } else if ((lanche === "queijo") ||
            (lanche === "chantily")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        // Cálculo do valor total baseado nos itens e quantidades
        total = cardapio[lanche] * quantidade;
        if (extra !== "") {
            total += cardapio[extra] * quantidadeExtra;
        }
        if (third !== "") {
            total += cardapio[third] * quantidadeThird;
        }

        // Aplicação de desconto ou acréscimo baseado no método de pagamento
        if (metodoDePagamento === "dinheiro") {
            total *= 0.95; // Aplicar desconto de 5%
        } else if (metodoDePagamento === "credito") {
            total *= 1.03; // Aplicar acréscimo de 3%
        }

        // Formatação do valor total e retorno da mensagem
        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

console.log(`
  | codigo    | descrição                   | valor   |
  |-----------|-----------------------------|---------|
  | cafe      | Café                        | R$ 3,00 |
  | chantily  | Chantily (extra do Café)    | R$ 1,50 |
  | suco      | Suco Natural                | R$ 6,20 |
  | sanduiche | Sanduíche                   | R$ 6,50 |
  | queijo    | Queijo (extra do Sanduíche) | R$ 2,00 |
  | salgado   | Salgado                     | R$ 7,25 |
  | combo1    | 1 Suco e 1 Sanduíche        | R$ 9,50 |
  | combo2    | 1 Café e 1 Sanduíche        | R$ 7,50 |
`);


const caixa = new CaixaDaLanchonete()

const compraSimples = caixa.calcularValorDaCompra("dinheiro", ["salgado,1"])
console.log("-um salgado, dinheiro.")
console.log(compraSimples)


const saidaChantilySemCafe = caixa.calcularValorDaCompra("debito", ["chantily,1"]); // Correção aqui
console.log("- Um chantily por favor, pagarei no débito.");
console.log(saidaChantilySemCafe);

const saidaCafeComChantily = caixa.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"]);
console.log("- Um café e um chantily, pagarei no débito.");
console.log(saidaCafeComChantily);

const comboTresCafes = caixa.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"]); // Correção aqui
console.log("- Um combo n1 e dois cafés, pagarei no crédito.");
console.log(comboTresCafes);

const salgadoComCafe = caixa.calcularValorDaCompra("dinheiro", ["salgado,1", "cafe,1"]); // Correção aqui
console.log("- Um salgado e um café no dinheiro.");
console.log(salgadoComCafe);

const sanduicheComQueijoDebito = caixa.calcularValorDaCompra("debito", ["sanduiche,1", "queijo,1"]);
console.log("- Um sanduíche com queijo, pagarei no débito.");
console.log(sanduicheComQueijoDebito);


export { CaixaDaLanchonete };
