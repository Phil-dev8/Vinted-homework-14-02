import "../styles/components/PublishField.css";

export const PublishField = ({
  name,
  value,
  onChange,
  placeholder,
  type,
  isLastChild,
}) => {
  return (
    <div
      className={`publish-field-wrapper ${isLastChild && "publish-no-border"}`}
    >
      <div className="publish-field-content">
        <p>{name}</p>
        {type === "textarea" ? (
          <textarea
            className={`publish-field-input`}
            style={{ resize: "none" }}
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            rows={5}
          />
        ) : (
          <input
            type={type}
            className={`publish-field-input`}
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};
