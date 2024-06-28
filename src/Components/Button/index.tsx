export interface CustomButtonProps {
  text: string;
  disabled: boolean;
}

function CustomButton({ text, disabled }: CustomButtonProps) {
  return (
    <button
      className="bg-my-blue p-2 rounded-md"
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}

export default CustomButton;
