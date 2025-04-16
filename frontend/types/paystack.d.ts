// // types/paystack.d.ts
// interface PaystackPop {
//     setup(options: {
//       key: string;
//       email: string;
//       amount: number;
//       currency: string;
//       ref: string;
//       callback: (response: any) => void;
//       onClose: () => void;
//     }): { openIframe: () => void };
//   }
  
//   interface Window {
//     PaystackPop: PaystackPop;
//   }

interface PaystackPop {
  setup(options: {
    key: string;
    email: string;
    amount: string; // Changed from number to string
    currency: string;
    ref: string;
    callback: (response: any) => void;
    onClose: () => void;
  }): { openIframe: () => void };
}

interface Window {
  PaystackPop: PaystackPop;
}