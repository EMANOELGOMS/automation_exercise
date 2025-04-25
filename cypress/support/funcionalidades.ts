class TestesFuncionalidadeDoSite {
  realizar_login() {
    cy.visit("/");
  }

  tela_de_produtos() {
    cy.get(".shop-menu > .nav > :nth-child(2) > a")
      .should("be.visible")
      .and("contain.text", "Products")
      .click();
  }
}

export default new TestesFuncionalidadeDoSite();
