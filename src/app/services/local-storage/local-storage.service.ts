import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  exerciseTable = {
    sortField: 'exerciseTableSortField',
    sortDirection: 'exerciseTableSortDirection',
    showFilters: 'exerciseTableShowFilters',
    selectedTypeFilter: 'exerciseTableSelectedTypeFilter',
    selectedMuscleGroupFilter: 'exerciseTableSelectedMuscleGroupFilter',
    pageItemLimit: 'exerciseTablePageItemLimit',
  };

  constructor() { }

  get(fieldName: string): string {
    return localStorage.getItem(fieldName);
  }

  set(fieldName: string, value: any) {
    localStorage.setItem(fieldName, value.toString());
  }

  remove(fieldName: string) {
    localStorage.removeItem(fieldName);
  }
}
