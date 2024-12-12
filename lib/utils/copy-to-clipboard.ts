const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.textContent = text;
  document.body.appendChild(textArea);

  const selection = document.getSelection();
  if (selection) {
    const range = document.createRange();
    range.selectNode(textArea);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    selection.removeAllRanges();
  }
  document.body.removeChild(textArea);
};

/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
export const copyToClipboard = async (content: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(content);
  } else {
    unsecuredCopyToClipboard(content);
  }
};