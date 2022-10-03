import { useForm } from 'react-hook-form';

// function TodoList() {
//     const [toDo,setToDo] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: {value},
//         } = event;
//         setToDo(value);
//     };
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//     };
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={toDo} placeholder="write todo" />
//                 <button>ADD</button>
//             </form>
//         </div>
//     );
// };

interface IForm {
  Email: string;
  Name: string;
  Id: string;
  Pw: string;
  PwConfirm: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      Email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    if (data.Pw !== data.PwConfirm) {
      setError(
        'Pw',
        { message: 'Passwords are not same' },
        { shouldFocus: true }
      );
    }
    setError('extraError', { message: 'Server offline' });
  };
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('Email', {
            required: 'email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com allowed',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.Email?.message}</span>
        <input {...register('Name', { required: true })} placeholder="Name" />
        <span>{errors?.Name?.message}</span>
        <input {...register('Id', { required: true })} placeholder="Id" />
        <span>{errors?.Id?.message}</span>
        <input {...register('Pw', { required: true })} placeholder="Pw" />
        <span>{errors?.Pw?.message}</span>
        <input
          {...register('PwConfirm', { required: true })}
          placeholder="PwConfirm"
        />
        <span>{errors?.PwConfirm?.message}</span>
        <button>ADD</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
