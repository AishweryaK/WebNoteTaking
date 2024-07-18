import { CustomButtonProps } from "./button";

function CustomButton({ text, disabled }: CustomButtonProps) {
  return (
    <button
      className={`w-full text-white font-bold rounded-md py-2 px-4 focus:outline-none focus:shadow-outline ${disabled ? 'bg-my-blue-100' : 'bg-my-blue-500D hover:bg-my-blue-700'}`}
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}

export default CustomButton;
