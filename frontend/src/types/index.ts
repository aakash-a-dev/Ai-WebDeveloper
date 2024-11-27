export interface File {
  name: string;
  content: string;
  path: string;
  type: 'file' | 'folder';
  children?: File[];
}

export interface TabData {
  id: string;
  title: string;
  content: string;
  path: string;
}