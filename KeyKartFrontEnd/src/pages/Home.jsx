import SearchBar from "../components/SearchBar";

export const Home = () => {
  return (
    <div>
      <div>
        <div className="flex flex-row justify-between">
          <p className="p-10 text-left text-5xl lg:text-8xl font-['NeueBit'] text-slate-700">
            Bid, Win, Type.
          </p>
        </div>
        <div className='relative w-full h-full md:h-[200px] lg:h-[500px] overflow-hidden object-cover'>
            <img  className="md:-translate-y-1/3" src="src/assets/images/home-page-banner.jpg"></img>
        </div>
      </div>
      <div className="slider overflow w-full h-fit text-sm md:text-lg py-10">
        <div className="slider-wrapper flex flex-col md:flex-row gap-10 md:h-full overflow-x-scroll scroll-smooth snap-x ">
          <div className="slide">
            <p className=" text-left p-4 md:p-28 w-screen md:w-[1200px]">
             <span className="text-slate-400 font-['NeueBit'] text-5xl"> #1: Bid <br/></span>
              Every keyboard enthusiast knows that the quest for the perfect
              keyboard is an adventure. At KeyBids, this journey begins with the
              excitement of bidding. Each limited edition mechanical keyboard we
              offer is a rare gem, meticulously crafted for those who appreciate
              the art of typing. By participating in our auctions, you're not
              just placing a bid; you're joining a community of collectors who
              understand the value of exclusivity. The bidding process is
              designed to be engaging, competitive, and rewarding, giving you
              the chance to secure a piece of history. It's about the thrill of
              the hunt and the joy of winning something truly unique.
            </p>
          </div>
          <div className="slide">
            <p className="text-left p-4 md:p-28 w-screen md:w-[1200px]">
            <span className="text-slate-400 font-['NeueBit'] text-5xl"> #2: Win <br/></span>
              Winning at KeyBids is about more than just outbidding others—it's
              about securing a treasure that reflects your passion for
              mechanical keyboards. When you win, you know you’ve earned
              something special, a keyboard that stands out not only for its
              functionality but also for its limited availability. Each keyboard
              is a statement piece, a blend of art and engineering that elevates
              your typing experience. The victory is sweetened by the knowledge
              that you’ve obtained something rare, something that many desire
              but only a few can own.
            </p>
          </div>

          <div className="slide">
            <p className="text-left p-4 md:p-28 w-screen md:w-[1200px]">
            <span className="text-slate-400 font-['NeueBit'] text-5xl">#3: Type <br/></span>
              Every keystroke is a reminder of the craftsmanship and attention
              to detail that went into its creation. At KeyBids, we believe that
              the tools you use should inspire you, and there’s nothing more
              inspiring than typing on a keyboard that’s as unique as you are.
              The tactile feedback, the sound, the aesthetics—all come together
              to create a typing experience that’s both satisfying and
              unparalleled. With each keystroke, you’re not just typing—you’re
              connecting with a piece of art.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
