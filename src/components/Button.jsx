import "./Button.css";

function CommonButton({ children, type="button", onClick, disabled,className}){
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button ${className}`.trim()}
        >
            {children}
        </button>
    );
}
export default CommonButton;