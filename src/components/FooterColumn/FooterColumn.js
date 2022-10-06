import "./FooterColumn.scss";

function FooterColumn(props) {
  return (
    <div className="footer-actions" onClick={() => props.setVisible(true)}>
      <i className="fa fa-plus icon" />
      Add another card
    </div>
  );
}

export default FooterColumn;
