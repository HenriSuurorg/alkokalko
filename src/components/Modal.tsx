import React from "react"

interface Props {
  setModal: React.Dispatch<React.SetStateAction<any>>
}

export const Modal: React.FC<Props> = ({ setModal }) => {
  return (
    <div>
      <div className="bac__modal">
        <div
          className="bac__modal-overlay"
          onClick={() => setModal(false)}
        ></div>
        <div className="bac__modal-content">
          <h2 className="bac__modal-content-title">Tähelepanu!</h2>
          <h3 className="bac__modal-content-body">
            Tegemist on oletusega, mida ei saa ja ei tohi kasutada otsustamaks,
            millal rooli minna!
          </h3>
          <button
            className="bac__modal-content-button"
            onClick={() => setModal(false)}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}
