const Button = ({ name, handleClick, bstyle, type, disabled, form }) => {
  return (
    <button
      className={`px-4 py-2 cursor-pointer ${bstyle} rounded disabled:bg-gray-400 disabled:text-white disabled:ring-0`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      form={form}
    >
      {name}
    </button>
  );
};

export default Button;
