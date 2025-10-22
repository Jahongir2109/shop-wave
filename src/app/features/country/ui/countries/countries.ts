import { CountryService } from '@/features/country/api/country.service';
import { Column, Country } from '@/shared/models';
import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-countries',
  imports: [
    CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        DialogModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
  ],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
  providers: [MessageService,ConfirmationService,CountryService]
})
export class Countries {
productDialog: boolean = false;

    countries = signal<Country[]>([]);

    country!: Country;

    selectedCountries!: Country[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;


    cols!: Column[];

    constructor(
        private countryService: CountryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.countryService.getCountries().then((data:Country[]) => {
            this.countries.set(data.map((a)=>{
                return {
                    name: a.name,
                    code: a.code,
                    id: this.createId()
                }
            }));
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
        ];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.country = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Country) {
        this.country = { ...product };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.countries.set(this.countries().filter((val) => !this.selectedCountries?.includes(val)));
                this.selectedCountries = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Country) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.countries.set(this.countries().filter((val) => val.id !== product.id));
                this.country = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.countries().length; i++) {
            if (this.countries()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    saveProduct() {
        this.submitted = true;
        let _products = this.countries();
        if (this.country.name?.trim()) {
            if (this.country.id) {
                _products[this.findIndexById(this.country.id)] = this.country;
                this.countries.set([..._products]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.country.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.countries.set([..._products, this.country]);
            }

            this.productDialog = false;
            this.country = {};
        }
    }
}
