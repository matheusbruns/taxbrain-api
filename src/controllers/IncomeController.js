const IncomeModel = require("../models/IncomeModel");
const ClientModel = require("../models/ClientModel");
require('dotenv').config();

module.exports = {
    async create(req, res) {
        const { fixedIncome, extraIncome, client, month, year } = req.body;

        const clientId = await ClientModel.findById(client);

        if (!clientId) {
            return res.status(400).json({ error: 'Client not found' });
        }

        function calcularINSS(salario) {
            if (salario <= 1320) {
                return salario * 0.075;
            } else if (salario <= 2571.29) {
                return salario * 0.09 - 19.8;
            } else if (salario <= 3856.94) {
                return salario * 0.12 - 96.94;
            } else if (salario <= 7507.49) {
                return salario * 0.14 - 174.08;
            } else {
                return 1051.41; // Valor máximo de contribuição do INSS em 2023
            }
        }

        function calcularRenda(salario) {
            const inss = calcularINSS(salario);
            const rendaLiquida = salario - inss;

            return {
                salario: salario,
                inss: inss,
                rendaLiquida: rendaLiquida,
            };
        }

        const salario = fixedIncome; // Valor do salário bruto
        const resultado = calcularRenda(salario);

        // console.log("Salário: R$", resultado.salario.toFixed(2));
        // console.log("INSS: R$", resultado.inss.toFixed(2));
        // console.log("Renda Líquida: R$", resultado.rendaLiquida.toFixed(2));

        function IRRF(salario) {

            // Fonte: https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tributos/irpf-imposto-de-renda-pessoa-fisica#tabelas-de-incid-ncia-mensal
            const aliquotas = [0, 0.075, 0.15, 0.225, 0.275];    // aliquotas de IR
            const bases = [2112.00, 2826.65, 3751.06, 4664.68, Infinity]; // bases de calculo
        
            // calcula tamanho das faixas de tributacao conforme salario
            const faixas = bases.map(function (b, i, arr) {
        
              // a faixa atual eh no maximo o valor da base de calculo
              var faixa = Math.min(salario, b)
        
              // se a base nao for a primeira, precisamos subtrair o valor da base anterior
              if (i !== 0) {
                faixa -= arr[i - 1];
              }
        
              // bases maiores que salario podem resultar em faixas negativas, por isso zeramos essas
              faixa = Math.max(faixa, 0);
        
              return faixa;
        
            });
        
            // calcula imposto conforme a aliquota de cada faixa e soma ao valor total
            const imposto = faixas.reduce(function (sum, f, i) {
              // calcula imposto da faixa multiplicando sua aliquota
              const impFaixa = (f * aliquotas[i]);
              return sum += impFaixa;
            }, 0);
        
            // imposto a pagar sobre rendimentos
            return imposto;
        
          }

        try {
            const inssDiscount = parseFloat(resultado.inss.toFixed(2));
            const irDiscount = parseFloat(IRRF(resultado.rendaLiquida.toFixed(2)));
            const netIncome = fixedIncome - (inssDiscount + irDiscount);
           
            const income = await IncomeModel.create({
                fixedIncome,
                extraIncome,
                client,
                month,
                year,
                inssDiscount: inssDiscount,
                irDiscount: irDiscount,
                totalDiscount: inssDiscount + irDiscount,
                netIncome: netIncome,
            });

            res.status(201).json(income);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async read(req, res) {
        try {
            const clients = await IncomeModel.find({});
            res.status(200).json(clients);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getIncomesByClientAndPeriod(req, res) {

        const { } = req.params;

        try {
            const clients = await IncomeModel.find({});
            res.status(200).json(clients);
        } catch (error) {
            res.status(400).json(error);
        }
    },

};
