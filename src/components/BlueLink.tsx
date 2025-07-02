// @ts-expect-error: Please stop screaming WebStorm
function BlueLink({href, children}) {
  return (
    <a href={href}
       className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition-all"
       target="_blank"
       rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default BlueLink;
