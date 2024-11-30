/* eslint-disable @typescript-eslint/no-explicit-any */
const Modal = ({ show, title, children, onClose }: any) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-r from-teal-800/50 to-teal-900/50 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-md max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
