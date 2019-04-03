import { ZonesValidator } from "./longueur.component";
import { AbstractControl } from '@angular/forms';

describe('Zones Validator', () => {
    it('une chaîne avec 10 espaces est invalide', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: '          ' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result ['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec des mots est valide', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: 'Vive angular' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: ' je le veux ' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('une phrase avec 1 espace et 2 caractères est invalide.', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: ' xx' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 2 espaces et 1 caractère est invalide.', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: ' x' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide.', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: ' xxx' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide.', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: ' ‘ xxxxx ' };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('une chaîne nulle est invalide.', () => {
        // Préparer un variable pour manipuler le validateur
        let validator = ZonesValidator.plageMinimum(3);
        let control = { value: null };
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
});