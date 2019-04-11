import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
    page.setZoneDescriptionProblemeCaracteresSuffisant();
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-valid');
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneDescriptionProblemeCaracteresInsuffisant();
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });
});
