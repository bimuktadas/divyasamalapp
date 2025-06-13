import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const users = {
  dibbu: { username: 'dibbu', password: 'ilovebimu' },
  bimu: { username: 'bimu', password: 'ilovedibbu' },
};

const sampleJournal = [
  { title: 'Our First Date', content: 'We went to the lake and watched the sunset.' },
];

const sampleMemories = [
  { caption: 'Beach day 🌊', url: 'https://placekitten.com/300/200' },
];

const sampleTickets = [
  { from: 'dibbu', message: 'Plan a surprise dinner ❤️', status: 'Open', priority: 'Medium' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [journals, setJournals] = useState(sampleJournal);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [memories, setMemories] = useState(sampleMemories);
  const [newMemory, setNewMemory] = useState({ caption: '', url: '' });
  const [tickets, setTickets] = useState(sampleTickets);
  const [newTicket, setNewTicket] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const login = () => {
    const u = users[username];
    if (u && u.password === password) {
      setUser(username);
      setError('');
    } else {
      setError('Password is incorrect');
    }
  };

  const addJournal = () => {
    if (!newEntry.title || !newEntry.content) return;
    setJournals([...journals, newEntry]);
    setNewEntry({ title: '', content: '' });
  };

  const addMemory = () => {
    if (!newMemory.caption || !newMemory.url) return;
    setMemories([...memories, newMemory]);
    setNewMemory({ caption: '', url: '' });
  };

  const submitTicket = () => {
    if (!newTicket.trim()) return;
    setTickets([...tickets, { from: user, message: newTicket, status: 'Open', priority }]);
    setNewTicket('');
    setPriority('Medium');
  };

  const closeTicket = (index) => {
    const updated = [...tickets];
    updated[index].status = 'Closed';
    setTickets(updated);
  };

  if (!user) {
    return (
      <div className="p-4 max-w-sm mx-auto font-sans text-purple-800">
        <h1 className="text-2xl mb-2 font-bold">Login</h1>
        <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" className="mt-2" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={login} className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">Login</Button>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans text-purple-900">
      <h1 className="text-3xl mb-4 font-extrabold text-pink-600">Welcome, {user === 'dibbu' ? 'My Love ❤️' : 'Admin'}!</h1>

      {/* Journal Section */}
      <Card className="mb-4 border-pink-300">
        <CardContent>
          <h2 className="text-xl mb-2 font-bold text-pink-500">Add New Journal</h2>
          <Input placeholder="Title" value={newEntry.title} onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })} />
          <textarea
            className="mt-2 w-full p-2 border border-purple-300 rounded"
            rows="4"
            placeholder="Write something..."
            value={newEntry.content}
            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          />
          <Button className="mt-2 bg-pink-500 text-white" onClick={addJournal}>Add Entry</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-purple-700">My Journal Entries</h2>
        {journals.map((entry, i) => (
          <Card key={i} className="mb-2 border-purple-200">
            <CardContent>
              <h3 className="font-bold text-md text-pink-600">{entry.title}</h3>
              <p>{entry.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Memories Section */}
      <Card className="mt-6 mb-4 border-pink-300">
        <CardContent>
          <h2 className="text-xl mb-2 font-bold text-pink-500">Add a Memory</h2>
          <Input placeholder="Caption" value={newMemory.caption} onChange={(e) => setNewMemory({ ...newMemory, caption: e.target.value })} />
          <Input placeholder="Image URL" className="mt-2" value={newMemory.url} onChange={(e) => setNewMemory({ ...newMemory, url: e.target.value })} />
          <Button className="mt-2 bg-purple-500 text-white" onClick={addMemory}>Add Memory</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Memories Gallery</h2>
        <Swiper spaceBetween={10} slidesPerView={2}>
          {memories.map((mem, idx) => (
            <SwiperSlide key={idx}>
              <div className="border rounded overflow-hidden shadow bg-white">
                <img src={mem.url} alt={mem.caption} className="w-full h-40 object-cover" />
                <div className="p-2 text-sm font-medium text-center text-pink-600">{mem.caption}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Ticketing System */}
      <Card className="mt-6 mb-4 border-pink-300">
        <CardContent>
          <h2 className="text-xl mb-2 font-bold text-pink-500">Raise a Ticket</h2>
          <textarea
            className="w-full p-2 border rounded border-purple-300"
            rows="3"
            placeholder="What do you want me to do, love?"
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
          />
          <select
            className="mt-2 w-full p-2 border rounded border-purple-300"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <Button className="mt-2 bg-pink-500 text-white" onClick={submitTicket}>Submit Ticket</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Tickets</h2>
        {tickets.map((t, i) => (
          <Card key={i} className="mb-2 border-purple-200">
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm"><strong>From:</strong> {t.from}</p>
                  <p className="text-sm"><strong>Status:</strong> {t.status}</p>
                  <p className="text-sm"><strong>Priority:</strong> <span className={t.priority === 'High' ? 'text-red-500' : t.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}>{t.priority}</span></p>
                </div>
                {user === 'bimu' && t.status === 'Open' && (
                  <Button size="sm" onClick={() => closeTicket(i)} className="bg-purple-500 text-white">Close</Button>
                )}
              </div>
              <p className="mt-2">{t.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
