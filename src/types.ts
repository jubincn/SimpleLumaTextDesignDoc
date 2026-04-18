export interface InfoCard {
  id: string;
  title: string;
  content: string;
  enableReadAloud: boolean;
  createdAt: number;
}

export type ViewState = 'display' | 'manage' | 'edit' | 'figma';
