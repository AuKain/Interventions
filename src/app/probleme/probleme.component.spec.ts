import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemeComponent } from './probleme.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeProblemeService } from './type-probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ TypeProblemeService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('champ PRÉNOM valide avec 3 caractères', () => {
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('a'.repeat(3));
    expect(prenomProbleme.valid).toBe(true);
  });

  it('Champ PRÉNOM invalide avec 2 caractères ', () => {
    let errors = {};
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('a'.repeat(2));
    errors = prenomProbleme.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it('Champ PRÉNOM valide avec 200 caractères', () => {
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('a'.repeat(200));
    expect(prenomProbleme.valid).toBe(true);
  });

  it('Champ PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    errors = prenomProbleme.errors || {};
    expect(errors['required']).toBe(true);
  });

  it('Champ PRÉNOM invalide avec 10 espaces', () => {
    let errors = {};
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    errors = prenomProbleme.errors || {};
    prenomProbleme.setValue(' '.repeat(10));
    expect(errors['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('Champ PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let errors = {};
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    errors = prenomProbleme.errors || {};
    prenomProbleme.setValue('  a');
    expect(errors['nbreCaracteresInsuffisants']).toBe(true);
  })

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('pasNotifier');
    let errors = {};
    let zone = component.problemeForm.controls['telephone'];
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.gestionNotification('pasNotifier');
    let errors = {};
    let zone = component.problemeForm.controls['telephone'];
    expect(zone.value).toBeNull();
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('pasNotifier');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionNotification('pasNotifier');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est activée quand notifier par courrielcourriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('ENABLED');
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courrielcourriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('ENABLED');
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('aaa');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe  = component.problemeForm.get('courrielGroup');
    courriel.setValue('');
    courrielConfirmation.setValue('aaa@aa.a');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe  = component.problemeForm.get('courrielGroup');
    courriel.setValue('aaa@aa.a');
    courrielConfirmation.setValue('');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe  = component.problemeForm.get('courrielGroup');
    courriel.setValue('aaa@aa.a');
    courrielConfirmation.setValue('bbb@bb.b');
    errors = groupe.errors || {};
    expect(errors['match']).toBeTruthy();
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotification('courriel');
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe  = component.problemeForm.get('courrielGroup');
    courriel.setValue('aaa@aa.a');
    courrielConfirmation.setValue('aaa@aa.a');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
});