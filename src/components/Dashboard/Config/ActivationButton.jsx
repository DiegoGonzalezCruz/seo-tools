const { Button } = require("@/components/ui/button");

// Shared Button Component
export const ActivationButton = ({ currentLLM, targetLLM, onActivate }) => (
  <Button
    onClick={onActivate}
    className={`disabled:opacity-60 ${currentLLM === targetLLM ? "bg-green-500" : ""}`}
    disabled={currentLLM === targetLLM}
  >
    {currentLLM === targetLLM ? "Active" : "Activate"}
  </Button>
);
