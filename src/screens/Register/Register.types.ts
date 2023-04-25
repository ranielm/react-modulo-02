export interface IRegisterProps {
    onSubmit: (data: IRegisterData) => void;
}

export interface IRegisterData {
    name: string;
    email: string;
    age: string;
}