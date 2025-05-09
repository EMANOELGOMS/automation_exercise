import { faker } from "@faker-js/faker";
import funcionalidades from "../support/funcionalidades";

describe("Teste do site de automação", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com/");
  });

  it("Deve acessar a página inicial e verificar o título", () => {
    cy.title().should("eq", "Automation Exercise");
  });

  it("Deve acessar a página de login", () => {
    cy.get('a[href="/login"]').click();
    cy.get("h2").should("contain", "Login to your account");
  });

  it("Deve exibir erro ao tentar logar com credenciais inválidas", () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type("emailinvalido@teste.com");
    cy.get('[data-qa="login-password"]').type("senhaerrada");
    cy.get('[data-qa="login-button"]').click();
    cy.get(".login-form p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  const user_email = `${faker.person.firstName()}@gmail.com`;
  const user_password = "123456";

  it("Deve cadastrar um novo usuário", () => {
    const nome_teste = `Josue Carneiro`;
    //dados da nova conta
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(nome_teste);
    cy.get('[data-qa="signup-email"]').type(user_email);
    cy.get('[data-qa="signup-button"]').click();
    cy.wait(500);

    cy.get("#id_gender1").should(`be.visible`).check(); //seleciona o checkbox
    cy.get('[data-qa="password"]').type(user_password);

    const value_dia: string = `22`;
    const value_mes: string = `12`;
    const value_ano: string = `2021`;

    const value_name: string = "Josue";
    const value_last_name: string = "Carneiro";

    //dia
    cy.get('[data-qa="days"]').should(`be.visible`).select(value_dia);
    //mes
    cy.get('[data-qa="months"]').should(`be.visible`).select(value_mes);
    //anos
    cy.get('[data-qa="years"]').should(`be.visible`).select(value_ano);

    cy.get("#newsletter").should("be.visible").check();
    cy.get("#optin").should("be.visible").check();

    cy.get('[data-qa="first_name"]').type(value_name);

    cy.get('[data-qa="last_name"]').type(value_last_name);
    cy.get('[data-qa="company"]').type("eu quero pao");
    cy.get('[data-qa="address"]').type("Rua salgado");
    cy.get('[data-qa="address2"]').type("Casa dos saldgados 02");

    cy.get('[data-qa="country"]').select("Canada");

    cy.get('[data-qa="state"]').type("eu quero pao");
    cy.get('[data-qa="city"]').type("PeterBurgos");
    cy.get('[data-qa="zipcode"]').type("67");
    cy.get('[data-qa="mobile_number"]').type("89898909809");

    cy.get('[data-qa="create-account"]').click();

    cy.contains('[data-qa="account-created"]', "Account Created!").should(
      "be.visible"
    );

    //cy.get('[data-qa="account-created"]').should('contain.text', "Account Created!");

    cy.get(".col-sm-9").within(() => {
      cy.get(":nth-child(2)").should(
        "contain.text",
        "Congratulations! Your new account has been successfully created!"
      );
      cy.get(":nth-child(3)").should(
        "contain.text",
        "You can now take advantage of member privileges to enhance your online shopping experience with us."
      );
    });
    cy.get('[data-qa="continue-button"]').should("be.visible").click();
  });

  it("Deve fazer login com sucesso", () => {
    const user_existente = "Darien@gmail.com";
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(user_existente);
    cy.get('[data-qa="login-password"]').type(user_password);
    cy.get('[data-qa="login-button"]').click();

    const headr_site = ["Logout", "Delete Account"];

    cy.get(".shop-menu > .nav").within(() => {
      headr_site.forEach((itens) => {
        cy.contains("a", itens).should("exist");
      });
    });
  });

  it.only("Deve pesquisar um produto e verificar o resultado", () => {
    //vai para os produtos
    funcionalidades.tela_de_produtos();

    const value_search = "Asade frango"; //nome do produto

    cy.get("#search_product").type(value_search);
    cy.get("#search_product").should("have.value", value_search);
    cy.get("#submit_search").click();

    const searchTerm = encodeURIComponent(value_search);

    cy.url().should("include", `search=${searchTerm}`); // ajuste o parâmetro conforme o sistema

    cy.url().should("match", new RegExp(`search=${searchTerm}`));
  });
  it("Deve adicionar um produto ao carrinho", () => {
    cy.get(".product-image-wrapper").first().trigger("mouseover");
    cy.get(".add-to-cart").first().click();
    cy.get(".modal-content").should("contain", "Added!");
    cy.get(".modal-footer > .btn").should(`be.visible`).click();

    //verifica se o item esta no carrinho

    cy.get(".shop-menu > .nav > :nth-child(3) > a")
      .should("be.visible")
      .click();

    cy.get("#product-1").should("exist");
  });

  it("Deve esta com o carrinho vazio", () => {
    cy.get(".shop-menu > .nav > :nth-child(3) > a")
      .should("be.visible")
      .click();

    cy.get(".text-center")
      .should("be.visible")
      .and("contain", "Cart is empty! Click here to buy products.");
  });

  it("Deve preencher e enviar o formulário de contato", () => {
    cy.get('a[href="/contact_us"]').click();
    cy.get('[data-qa="name"]').type("Emanoel Teste");
    cy.get('[data-qa="email"]').type("teste@teste.com");
    cy.get('[data-qa="subject"]').type("Teste de contato");
    cy.get('[data-qa="message"]').type("Esta é uma mensagem de teste.");
    cy.get('[data-qa="submit-button"]').click();
    cy.get(".contact-form").should("contain", "Success!");
  });
  it("Deve acessar uma categoria e validar a URL", () => {
    cy.get(".left-sidebar").contains("Women").click();
    cy.url().should("include", "category_products/1");
  });
});

//acessa a tela de produtos

// const tela_produto = () => {
//   cy.get(".shop-menu > .nav > :nth-child(2) > a")
//     .should("be.visible")
//     .and("contain.text", "Products")
//     .click();
// };
