import classNames from 'classnames';
import "./style.scss";

const SearchInput = ({ 
    value, 
    onChange, 
    placeholder,
    icon,
    iconSize = 20 
}) => {

    const IconComponent = icon;

    return (
        <div className={classNames('search-input-wrapper', { 'has-icon': IconComponent })}>
            {IconComponent && <IconComponent className="search-icon" size={iconSize} />}
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchInput;