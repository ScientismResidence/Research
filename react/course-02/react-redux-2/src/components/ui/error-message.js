import { ErrorMessage } from "@hookform/error-message";

const FormErrorMessage = ({name, errors}) => {
    return (
        <ErrorMessage
            name={name}
            errors={errors}
            render={({message}) => {
                    return (
                        <div className="text-danger mt-1" style={{fontSize: '14px'}}>
                            {message}
                        </div>
                    )
                }
            }
        />
    )
}

export default FormErrorMessage;