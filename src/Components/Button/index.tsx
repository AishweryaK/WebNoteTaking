export interface CustomButtonProps {
  text: string;
  disabled: boolean;
}

function CustomButton({ text, disabled }: CustomButtonProps) {
  return (
    <button
      className={
        disabled
          ? 'w-full bg-my-blue-100 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
          : 'w-full bg-my-blue-500D hover:bg-my-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
      }
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}

export default CustomButton;
