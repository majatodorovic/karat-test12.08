const GeneralTermsOfUseField = ({
  dataTmp,
  setDataTmp,
  errorsTmp,
  setErrorsTmp,
}) => {
  return (
    <div className={`mt-3 flex flex-col`}>
      <div className="relative flex items-center gap-3 py-2">
        <input
          type="checkbox"
          id="accept_rules"
          name="accept_rules"
          onChange={(e) => {
            setDataTmp({
              ...dataTmp,
              accept_rules: e?.target?.checked,
            });
            setErrorsTmp(
              errorsTmp?.filter((error) => error !== "accept_rules"),
            );
          }}
          checked={dataTmp?.accept_rules}
          className="peer hidden"
        />
        <label
          htmlFor="accept_rules"
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-black bg-white text-white peer-checked:text-primary"
        >
          <i className="fa fa-circle hidden text-sm"></i>
        </label>
        <label htmlFor="agreed" className={`text-lg font-normal`}>
          Saglasan sam sa{" "}
          <a
            className={`underline`}
            href={`/strana/opsti-uslovi-poslovanja`}
            target={`_blank`}
          >
            <span>Opštim uslovima poslovanja</span>
          </a>
        </label>
      </div>
      {errorsTmp?.includes("accept_rules") && (
        <p className={`text-[0.75rem] text-red-500`}>
          Molimo Vas da prihvatite uslove korišćenja.
        </p>
      )}
    </div>
  );
};

export default GeneralTermsOfUseField;
