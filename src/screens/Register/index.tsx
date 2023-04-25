import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, RegisterForm, LabelRegister, InputRegister, ButtonRegister } from "./Register.styles"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IRegisterProps, IRegisterData } from './Register.types';

const Register: React.FC<IRegisterProps> = ({ onSubmit }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<IRegisterData>({
        name: '',
        email: '',
        age: '',
    })

    const validateName = (name: string): string | undefined => {
        if(name.trim().length < 3) {
            return 'O campo deve ter no mínimo 03 caracteres';
        }
    };

    const validateEmail = (email: string): string | undefined => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return 'O e-mail precisa ser válido';
        }
    };

    const validateAge = (age: string): number | string | undefined => {
        const ageNumber = Number(age);
        if (isNaN(ageNumber) || ageNumber < 18) {
            return 'Você precisa ter mais de 18 anos para entrar';
        }
    };

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const ageError = validateAge(formData.age);

        const toastPosition = toast.POSITION.TOP_RIGHT

        if(nameError) { 
            toast.error(nameError, {position: toastPosition});
            return
        }

        if(emailError) {
            toast.error(emailError, {position: toastPosition});
            return
        }

        if(ageError) {
            toast.error(ageError, {position: toastPosition});
            return
        }


        console.log(formData);
        navigate('/listview');
    };

    return (
        <>
            <Title>Gerenciador de tarefas</Title>
            <RegisterForm onSubmit={handleSubmit}>
                <LabelRegister>Nome:</LabelRegister>
                <InputRegister type='text' name='name' value={formData.name} onChange={handleChange} />
                <LabelRegister>E-mail:</LabelRegister>
                <InputRegister type='email' name='email' value={formData.email} onChange={handleChange} />
                <LabelRegister>Idade:</LabelRegister>
                <InputRegister type='text'name='age' value={formData.age} onChange={handleChange} />

                <ButtonRegister type='submit'>Entrar</ButtonRegister>
                <ToastContainer />
            </RegisterForm>
        </>   
    );
  };
  
  export default Register;
  