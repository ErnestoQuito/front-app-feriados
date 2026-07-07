export interface Country {
  id: number;
  country_code: string;
  country_name: string;
}

export interface Holiday {
  id: number;
  holiday_date: string;
  holiday_name: string;
  holiday_description: string;
  holiday_type: string;
  holiday_is_substitutable: boolean;
  holiday_is_mandatory: boolean;
  holiday_law_reference: string;
}
