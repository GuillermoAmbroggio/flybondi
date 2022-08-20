describe('Home testing', () => {
  beforeEach(() => {
    cy.intercept('GET', '/trips/min-max-price', {
      fixture: 'getMinMaxPrice.json',
    }).as('getMinMaxPrice');
    cy.visit('/');
  });

  it('Successfully loads', () => {
    cy.contains('Arma tu viaje eligiendo tu destino');
  });

  describe('Search by destination (COR - MDZ)', () => {
    it('Search with empty inputs', () => {
      /** Doy click a buscar vuelos */
      cy.get('#buttonSubmitByDestination').click();
      cy.contains('Campo requerido');
    });

    it('Success search', () => {
      /** Mocks de los resultados COR to MDZ */
      cy.intercept(
        'GET',
        '/trips?page=1&passengers=1&city_to=MDZ&city_from=COR',
        { fixture: 'getTripsCORtoMDZ.json' },
      ).as('getTripsCORtoMDZ');

      /**Agrego cantidad de pasajeros */
      cy.get('#inputPassengersByDestination').type('1');

      /** Agrego ciudad de salida */
      cy.get('#inputSelectCityFromByDestination')
        .click({ force: true })
        .get('#inputSelectCityFromByDestination-option-Córdoba')
        .click();

      /** Agrego ciudad de destino */
      cy.get('#inputSelectCityToByDestination')
        .click({ force: true })
        .get('#inputSelectCityToByDestination-option-Mendoza')
        .click();

      /** Doy click a buscar vuelos */
      cy.get('#buttonSubmitByDestination').click();
    });
  });

  describe('Search by price (160 - 250)', () => {
    it('Search with empty inputs', () => {
      /** Doy click a buscar vuelos */
      cy.get('#buttonSubmitByPrice').click();
      cy.contains('Campo requerido');
    });

    it('Success search', () => {
      /** Mocks de los resultados en un rango de precio 150 a 250*/
      cy.intercept(
        'GET',
        'trips?page=1&price_min=160&price_max=250&passengers=1',
        { fixture: 'getTrips160to250.json' },
      ).as('getTrips160to250');

      /**Agrego cantidad de pasajeros */
      cy.get('#inputPassengersByPrice').type('1');

      /** Agrego precio minimo */
      cy.get('#inputPriceMinByPrice').clear().type('160');

      /** Agrego precio maximo */
      cy.get('#inputPriceMaxByPrice').clear().type('250');

      /** Doy click a buscar vuelos */
      cy.get('#buttonSubmitByPrice').click();
    });
  });
});
