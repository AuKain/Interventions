import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur/longueur.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: string; 
  constructor(private fb: FormBuilder, private typesProbleme: TypeProblemeService) {}

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenomProbleme : ['', [ZonesValidator.plageMinimum(3), Validators.required]],
      nomProbleme : ['', [Validators.maxLength(50), Validators.required]],
      noTypeProbleme: ['', [, Validators.required]]
    });

    this.typesProbleme.obtenirTypesProbleme()
    .subscribe(cat => this.typesProblemes = cat,
               error => this.errorMessage = <any>error);
  }

}
