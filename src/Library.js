import React, { useState } from "react";
import LogIn from "./LogIn";
import { games } from "./DataListGames";
import DataListGames from "./DataListGames";
import Card from "./Card";

export default function Cards() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [bet, setBet] = useState(0);
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const betAmounts = [10, 20, 30];

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(true);
  };

  const handleChange = (event) => setValue(event.target.value);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setBet(0);
  };

  const confirmBet = () => setBet(value);

  const setBetAmount = (minBet) => {
    setBet(minBet);
    setValue(0);
  };

  const restBet = () => {
    setBet(0);
    setValue(0);
  };

  return (
    <div>
      {loggedIn ? (
        <LogIn />
      ) : (
        <div>
          <DataListGames />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-10">
              <h2 className="text-white text-2xl font-bold">LIST OF GAMES</h2>
              <p className="relative w-full overflow-hidden text-gray-500 text-1xl">
                Choose a game and set your bet.
              </p>
              <div className="mt-6 grid md:grid-cols-4 gap-x-5 space-y-0 grid-cols-2 gap-y-5 ">
                {games.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleGameClick(game)}
                    className="rounded group"
                  >
                    <Card game={game} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedGame && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="betblock rounded-lg p-7 border-4 max-w-sm">
                <h5 className="mb-4 text-xl text-center font-bold text-neutral-800 dark:text-neutral-50">
                  {selectedGame.name}
                </h5>
                <div className="flex items-center justify-center">
                  <img
                    className="border-4 rounded h-full w-32 object-cover object-center mb-5"
                    src={selectedGame.imageSrc}
                    alt={selectedGame.imageAlt}
                  />
                </div>
                <p className="mb-4 text-4xl font-bold text-neutral-600 dark:text-neutral-200 text-center">
                  ${bet}
                </p>
                <div className="flex justify-center mb-5">
                  {betAmounts.map((amount) => (
                    <button
                      key={amount}
                      className="bgcolor hover:bg-gray-900 text-white hover:text-white hover:btnConfirm font-bold py-2 px-2 rounded mr-3"
                      onClick={() => setBetAmount(amount)}
                    >
                      Bet ${amount}
                    </button>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="justify-center text-black flex text-center">
                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      className="text-center"
                    />
                  </label>
                </div>
                <div className="mx-auto mt-4 grid justify-item-center">
                  <button
                    type="button"
                    onClick={confirmBet}
                    className="btnConfirm text-black hover:btnConfirm focus:outline-none font-medium rounded-lg text-sm px-7 py-2.5 mb-5"
                  >
                    Submit Amount
                  </button>

                  <hr />

                  <button
                    type="button"
                    className="bgcolor mt-5 hover:bg-gray-900 text-white hover:btnConfirm focus:outline-none font-medium rounded-lg text-sm px-7 py-2.5 mb-2"
                    onClick={restBet}
                  >
                    Restore Bet
                  </button>

                  <button
                    type="button"
                    className="bgcolor hover:bg-gray-900 text-white hover:btnConfirm focus:outline-none font-medium rounded-lg text-sm px-7 py-2.5 mb-3"
                    onClick={() => setSelectedGame(null)}
                  >
                    Deselect Game
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Sign Out button here */}
          <div className="mx-auto mt-5 h-32 w-32">
            <button
              onClick={handleLogout}
              type="button"
              class="text-white mt-5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-6 py-2.5 mr-1 mb-2 btnSignOut dark:focus:ring-gray-700"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
