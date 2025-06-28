import classNames from "classnames";
import "./style.scss";

export default function Button({
    children,      // conteúdo
    onClick,
    variant,
    size,
    icon,
    disabled,
    className,
    type = "button",
    iconSize = 20,
}) {

    if (size !== "large") {
        size = "medium";
    }

    const IconComponent = icon;

    return (
        <button
            className={classNames("btn", className, `btn-${variant}`, size)}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {IconComponent ? (
                <div className="childrenWithIcon">
                    <IconComponent size={iconSize} />
                    {children}
                </div>
            ) : (
                <>{children}</>
            )}
        </button>
    );
}