
interface modalProps {
    messages: string;
    onClose: () =>void;
}
const ModalWarning: React.FC<modalProps> = ({messages, onClose}) => {
    const hanlderRedirect = () =>{
        window.location.href = "https://hr.photobank.vn/";
    }
    return (
     
      <div className="flex justify-center items-center fixed inset-0 z-50  bg-black bg-opacity-100 ">
        <div className="p-4 md:p-8 text-center max-w-3xl min-w-96 max-h-full bg-white rounded-lg shadow dark:bg-gray-700 font-semibold ">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg  text-gray-500 dark:text-gray-400">
            {messages}
          </h3>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="font-semibold  text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            onClick={hanlderRedirect}
          >
           Đồng ý
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="font-semibold py-2.5 px-5 ms-3 text-sm text-white focus:outline-none bg-slate-600 rounded-lg border 
            border-gray-200 hover:bg-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={hanlderRedirect}
          >
            Đóng
          </button>
        </div>
      </div>
    );
    
}
export default ModalWarning;