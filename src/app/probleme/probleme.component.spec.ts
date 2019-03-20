import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ  PRÉNOM valide avec 3 caractères', () => {
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('a'.repeat(3));
    expect(prenomProbleme.valid).toBe(true);
  });

  it('Champ PRÉNOM invalide avec 2 caractères ', () => {
    let errors = {};
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('a'.repeat(2));
    errors = prenomProbleme.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Champ PRÉNOM valide avec 200 caractères', () => {
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('a'.repeat(200));
    expect(prenomProbleme.valid).toBe(true);
  });

  it('Champ  PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    errors = prenomProbleme.errors || {};
    expect(errors['required']).toBe(true);
  });

  it('Champ PRÉNOM valide avec 10 espaces', () => {
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue(' '.repeat(10));
    expect(prenomProbleme.valid).toBe(true);
  });

  it('Champ  PRÉNOM valide avec 2 espaces et 1 caractère ', () => {
    let prenomProbleme = component.problemeForm.controls['prenomProbleme'];
    prenomProbleme.setValue('  a');
    expect(prenomProbleme.valid).toBe(true);
  })
});
